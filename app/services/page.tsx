import ServicesMenu from "@/components/ServicesMenu";
import { createPageMetadata } from "@/lib/site";

export const metadata = createPageMetadata({
  title: "Nail & Beauty Services",
  description:
    "Browse manicures, pedicures, artificial nails, dipping services, facials, waxing, service details, and prices at our Menlo Park salon.",
  path: "/services/",
});

export default function ServicesPage() {
  return <ServicesMenu />;
}
