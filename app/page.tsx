import { ProjectInterface } from '@/common.types';
import { ProjectCard } from '@/components/ProjectCard';
import { fetchProjects } from '@/lib/actions';
import React from 'react';

type ProjectSearch = {
    projectSearch: {
        edges: {
            node: ProjectInterface;
        }[];
        pageInfo: {
            hasPreviousPage: boolean;
            hasNextPage: boolean;
            startCursor: string;
            endCursor: string;
        };
    };
};

export default async function Home() {
    const data = await fetchProjects() as ProjectSearch;

    const postsToDisplay = data?.projectSearch?.edges || [];

    if (postsToDisplay.length === 0) {
        return (
            <section className="flexStart flex-col paddings">
                Categories
                <p className="no-result-text text-center">Nothing yet.</p>
            </section>
        );
    }

    return (
        <div className="flex-start flex-col paddings mb-16">
            <h1>Categories</h1>
            <section className="project-grid">
                {postsToDisplay.map(({ node }: { node: ProjectInterface }) => (
                    <ProjectCard />
                ))}
            </section>
            <h1>LoadMore</h1>
        </div>
    );
}
