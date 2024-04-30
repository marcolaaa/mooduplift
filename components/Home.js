import React from 'react';
import QuoteCard from './quoteCard';
import useFetch from '../hook/useFetch';

export default function Home() {

    const { quotes, isLoading, error } = useFetch();

    return (
        <QuoteCard quotes={quotes} />
    );
}