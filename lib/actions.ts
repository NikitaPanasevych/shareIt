import { ProjectForm } from '@/common.types';
import { createProjectMutation, createUserMutation, getUserQuery } from '@/graphql';
import { GraphQLClient } from 'graphql-request';

const isProductions = process.env.NODE_ENV === 'production';

const apiUrl = isProductions ? process.env.NEXT_PUBLIC_GRAFBASE_API_URL || '' : 'http://127.0.0.1:4000/graphql';
const apiKey = isProductions ? process.env.NEXT_PUBLIC_GRAFBASE_API_KEY || '' : '123456789';
const serverUrl = isProductions ? process.env.NEXT_PUBLIC_GRAFBASE_SERVER_URL || '' : 'http://localhost:3000';

const client = new GraphQLClient(apiUrl);

const makeGraphqlRequest = async (query: string, variables = {}) => {
    try {
        return await client.request(query, variables);
    } catch (error) {
        throw error;
    }
};

export const getUser = (email: string) => {
    client.setHeader('x-api-key', apiKey);
    return makeGraphqlRequest(getUserQuery, { email });
};

export const createUser = (name: string, email: string, avatarUrl: string) => {
    client.setHeader('x-api-key', apiKey);
    const variables = {
        input: {
            name,
            email,
            avatarUrl
        }
    };
    return makeGraphqlRequest(createUserMutation, variables);
};

export const fetchToken = async () => {
    try {
        const response = await fetch(`${serverUrl}/api/auth/token`);
        return response.json();
    } catch (err) {
        throw err;
    }
};

export const uploadImage = async (imagePath: string) => {
    try {
        const response = await fetch(`${serverUrl}/api/upload`, {
            method: 'POST',
            body: JSON.stringify({ path: imagePath })
        });
        const data = await response.json();
        return data;
    } catch (error) {
        throw error;
    }
};

export const createNewProject = async (form: ProjectForm, creatorId: string, token: string) => {
    const imageUrl = await uploadImage(form.image);

    if (imageUrl) {
        client.setHeader('Authorization', `Bearer ${token}`);

        const variables = {
            input: {
                ...form,
                image: imageUrl,
                createdBy: {
                    link: creatorId
                }
            }
        };

        return makeGraphqlRequest(createProjectMutation, variables);
    }
};
