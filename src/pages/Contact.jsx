import MainLayout from "../components/common/MainLayout";
import { HowHelp, MainContact, MapSection } from "../components/contact";

const Contact = () => {
  return (
    <MainLayout>
      {/* How Help Section */}
      <HowHelp />

      {/* Main Contact Section */}
      <MainContact />

      {/* Map Section */}
      <MapSection />
    </MainLayout>
  );
};

export default Contact;
