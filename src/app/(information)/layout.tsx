import Footer from "@/components/common/app-footer"


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <main>
      {children}
      <Footer />
    </main>
  )
}