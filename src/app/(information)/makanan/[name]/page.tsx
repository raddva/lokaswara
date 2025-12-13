type PageProps = {
  params: {
    name: string;
  }
}

export default function DetailPage({
  params,
}: {
  params: { name: string };
}) {
  const nama = params?.name ?? "Tidak ada nama";

  return (
    <div className="p-10">
      <h1 className="text-4xl font-bold">{nama}</h1>
      <p className="text-lg mt-2">
        Ini adalah halaman detail untuk: <b>{nama}</b>.
      </p>
    </div>
  );
}