import { useState } from "react";
import { Link } from "react-router-dom";
import PageHeader from "../../components/common/PageHeader";
import StatCard from "../../components/common/StatCard";
import Button from "../../components/common/Button";
import Modal from "../../components/common/Modal";
import { useCurrentUser } from "../../hooks/useAuth";
import { useMyCourses } from "../../hooks/useCourses";
import { certificates } from "../../data/studentData";

function CertificatePreview({ certificate, name }) {
  return (
    <div className="print-area relative overflow-hidden rounded-2xl border-4 border-double border-primary/40 bg-white p-8 text-center">
      <div className="absolute -left-10 -top-10 h-32 w-32 rounded-full bg-primary/10"></div>
      <div className="absolute -bottom-10 -right-10 h-32 w-32 rounded-full bg-yellow-100"></div>
      <div className="relative">
        <p className="text-xl font-bold">
          MY<span className="text-primary">OC</span>
        </p>
        <p className="mt-6 text-xs uppercase tracking-[0.3em] text-gray-400">Certificate of Completion</p>
        <p className="mt-6 text-sm text-gray-500">This certifies that</p>
        <p className="mt-2 text-3xl font-bold">{name}</p>
        <p className="mt-4 text-sm text-gray-500">has successfully completed</p>
        <p className="mt-2 text-xl font-semibold text-primary">{certificate.title}</p>
        <div className="mt-8 flex justify-between text-left text-xs text-gray-500">
          <div>
            <p className="font-semibold text-[#10131d]">{certificate.instructor}</p>
            <p>Instructor</p>
          </div>
          <div className="text-right">
            <p className="font-semibold text-[#10131d]">{certificate.issueDate}</p>
            <p>{certificate.certificateId}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Certificates() {
  const user = useCurrentUser();
  const { myCourses } = useMyCourses();
  const [selected, setSelected] = useState(null);
  const [printAfterOpen, setPrintAfterOpen] = useState(false);

  const openCertificate = (certificate, print = false) => {
    setSelected(certificate);
    setPrintAfterOpen(print);
    if (print) setTimeout(() => window.print(), 300);
  };

  return (
    <>
      <PageHeader eyebrow="Achievements" title="Certificates" description="Certificates you have earned so far." />

      <section className="mb-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard label="Total Certificates" value={certificates.length} icon="ri-medal-line" tone="yellow" />
        <StatCard label="Courses Completed" value={myCourses.filter((c) => c.progress === 100).length} icon="ri-checkbox-circle-line" tone="green" />
        <StatCard label="In Progress" value={myCourses.filter((c) => c.progress < 100).length} icon="ri-loader-4-line" tone="blue" />
        <StatCard label="Achievement Level" value="Pro" icon="ri-vip-crown-line" tone="purple" />
      </section>

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {certificates.map((certificate) => (
          <div key={certificate.id} className="overflow-hidden rounded-2xl border border-gray-200 bg-white transition hover:-translate-y-1 hover:shadow-lg">
            <div className="relative h-36 overflow-hidden bg-gradient-to-br from-yellow-300 to-yellow-100 p-5">
              <div className="absolute -bottom-12 -right-10 h-40 w-40 rounded-full bg-white/30"></div>
              <i className="ri-award-fill text-4xl text-yellow-600"></i>
              <p className="absolute bottom-5 left-5 text-xs font-semibold uppercase tracking-wider text-yellow-800">Certificate of Completion</p>
            </div>
            <div className="p-5">
              <h3 className="text-lg font-semibold">{certificate.title}</h3>
              <p className="mt-1 text-sm text-gray-400">{certificate.instructor}</p>
              <div className="mt-4 flex justify-between text-xs text-gray-500">
                <span>{certificate.issueDate}</span>
                <span>{certificate.certificateId}</span>
              </div>
              <div className="mt-5 grid grid-cols-2 gap-2">
                <Button variant="outline" icon="ri-eye-line" onClick={() => openCertificate(certificate)}>View</Button>
                <Button icon="ri-download-2-line" onClick={() => openCertificate(certificate, true)}>Download</Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <section className="mt-8 flex flex-col justify-between gap-4 rounded-3xl bg-[#10131d] p-7 text-white md:flex-row md:items-center">
        <div>
          <h3 className="text-xl font-semibold">More certificates are waiting for you</h3>
          <p className="mt-1 text-sm text-white/50">Your next certificate starts with your next lesson.</p>
        </div>
        <Link to="/student/my-courses" className="w-fit rounded-xl bg-primary px-5 py-3 text-sm font-medium text-white hover:bg-white hover:text-[#10131d]">
          View My Courses
        </Link>
      </section>

      <Modal
        open={Boolean(selected)}
        onClose={() => setSelected(null)}
        title="Certificate"
        size="lg"
        footer={!printAfterOpen && <Button icon="ri-printer-line" onClick={() => window.print()}>Download / Print as PDF</Button>}
      >
        {selected && <CertificatePreview certificate={selected} name={user.name} />}
      </Modal>
    </>
  );
}

export default Certificates;
