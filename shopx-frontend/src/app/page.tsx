export default function HomePage() {
  return (
    <section className="space-y-6">
      <h1 className="text-2xl font-bold">به ShopX خوش آمدید 👋</h1>
      <p className="text-muted-foreground">
        این یک فروشگاه نمونه است. از منوی بالا می‌تونی به محصولات و سبد خرید بری.
      </p>
      <a
        href="/products"
        className="inline-block rounded bg-black text-white px-4 py-2"
      >
        مشاهده محصولات
      </a>
    </section>
  );
}