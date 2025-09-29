export default function Footer() {
  return (
    <footer className="border-t mt-10">
      <div className="container mx-auto px-4 py-6 text-sm text-muted-foreground">
        © {new Date().getFullYear()} ShopX — همه حقوق محفوظ است.
      </div>
    </footer>
  );
}