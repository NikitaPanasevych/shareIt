'use client';

import { SessionInterface } from '@/common.types';
import Image from 'next/image';
import FormField from './FormField';
import { categoryFilters } from '@/constants';
import CustomMenu from './CustomMenu';
import { useState } from 'react';
import { Button } from './Button';
import { createNewProject, fetchToken } from '@/lib/actions';

interface Props {
    type: string;
    session: SessionInterface;
}

export default function ProjectForm({ type, session }: Props) {
    const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        setIsSubmitting(true);

        const token = await fetchToken();

        try {
            if (type === 'create') {
                await createNewProject(form, session?.user?.id, token);
            }
        } catch (err) {
            console.log(err);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleChangeImage = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        const file = e.target.files?.[0];
        if (!file) return;
        if (!file.type.includes('image')) return alert('Please upload an image file');
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            const result = reader.result as string;
            handleStateChange('image', result);
        };
    };

    const handleStateChange = (fieldName: string, value: string) => {
        setForm((prev) => ({ ...prev, [fieldName]: value }));
    };

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [form, setForm] = useState({
        title: '',
        description: '',
        image: '',
        liveSiteUrl: '',
        githubUrl: '',
        category: ''
    });

    return (
        <form action="" onSubmit={handleFormSubmit} className="flexStart form">
            <div className="flexStart form_image-container">
                <label htmlFor="poster" className="flexCenter form_image-label">
                    {!form.image ? 'Upload a poster' : null}
                </label>
                <input
                    type="file"
                    name="image"
                    id="image"
                    className="form_image-input"
                    required={type === 'create'}
                    onChange={handleChangeImage}
                />
                {form.image ? (
                    <Image src={form.image} alt="Project poster" className="sm:p-10 z-20 object-contain" fill />
                ) : null}
            </div>
            <FormField
                title="Title"
                state={form.title}
                placeholder="Share It"
                setState={(value) => handleStateChange('title', value)}
            />
            <FormField
                title="Description"
                state={form.description}
                placeholder="Describe your project"
                setState={(value) => handleStateChange('description', value)}
            />
            <FormField
                type="url"
                title="Website URL"
                state={form.liveSiteUrl}
                placeholder="https://shareit.com"
                setState={(value) => handleStateChange('liveSiteUrl', value)}
            />
            <FormField
                type="url"
                title="Github URL"
                state={form.githubUrl}
                placeholder="htts://github.com/shareit"
                setState={(value) => handleStateChange('githubUrl', value)}
            />

            <CustomMenu
                title="Category"
                state={form.category}
                filters={categoryFilters}
                setState={(value) => handleStateChange('category', value)}
            />

            <div className="flexStart w-full">
                <Button
                    title={
                        isSubmitting
                            ? `${type === 'create' ? 'Creating' : 'Editing'}`
                            : `${type === 'create' ? 'Create' : 'Edit'}`
                    }
                    type="submit"
                    leftIcon={isSubmitting ? '' : '/plus.svg'}
                    isSubmitting={isSubmitting}
                />
            </div>
        </form>
    );
}
