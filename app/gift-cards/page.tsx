import GiftCardForm from "@/components/GiftCardForm";
import { createPageMetadata } from "@/lib/site";

export const metadata = createPageMetadata({
  title: "Gift Cards",
  description:
    "Give a Miu Miu Nail Design gift card for manicures, pedicures, nail enhancements, facials, and more in Menlo Park.",
  path: "/gift-cards/",
});

export default function GiftCardsPage() {
  return (
    <main className="gift-card" id="main-content">
      <GiftCardForm />
    </main>
  );
}
