export interface PageProps {
  params: Promise<{
    slug: string,
  }>,
  searchParams?: Promise<unknown>,
}
