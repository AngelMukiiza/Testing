// src/__tests__/PostsList.test.js
import React from 'react';
import { render, screen } from '@testing-library/react';
import PostsList from '../PostsList';
import { worker } from '../mocks/browser';

// Start MSW before tests run
beforeAll(() => worker.start());

// Close the MSW server after tests are done
afterAll(() => worker.close());

test('loads and displays posts from the API', async () => {
    render(<PostsList />);

    // Check that loading state is shown initially
    expect(screen.getByText(/Loading.../i)).toBeInTheDocument();

    // Use findByText to wait for the posts to load
    const post1 = await screen.findByText(/Test Post 1/i);
    const post2 = await screen.findByText(/Test Post 2/i);

    // Check if posts are displayed
    expect(post1).toBeInTheDocument();
    expect(post2).toBeInTheDocument();
});

test('displays post titles correctly', async () => {
    render(<PostsList />);

    // Use findByText to wait for the posts to load
    const post1 = await screen.findByText('Test Post 1');
    const post2 = await screen.findByText('Test Post 2');

    // Assert post titles are rendered
    expect(post1).toBeInTheDocument();
    expect(post2).toBeInTheDocument();
});
