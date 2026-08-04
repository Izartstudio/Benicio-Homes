import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProductDetailPage } from "@/app/projects/components";
import {
  getProjectBySlug,
  projectList,
} from "@/app/projects/data";

type ProjectPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return projectList.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    return {
      title: "Project Not Found | Benicio",
    };
  }

  return {
    title: project.metadata.title,
    description: project.metadata.description,
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  return <ProductDetailPage key={project.slug} project={project} />;
}
