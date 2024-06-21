"use client";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className='bg-black text-white md:px-6 py-2 sm:px-2 '>
      <div className='md:px-8 sm:px-2'>{children}</div>
    </section>
  );
}
