import Mailing from "components/feature/External/Mailing/Mailing";
import { mailing } from "database/mutations";

function MailingSection() {
  const handleSubscribe = (email) => {
    mailing.subscribe({ email });
  };

  return <Mailing handleSubscribe={handleSubscribe} />;
}

export default MailingSection;
