import { NextResponse } from 'next/server';
import { sampleProperties } from '@/lib/sampleData';

export async function GET() {
    try {
        // Return the sample properties data
        return NextResponse.json(sampleProperties);
    } catch (error) {
        console.error('Error fetching properties:', error);
        return NextResponse.json(
            { error: 'Failed to fetch properties' },
            { status: 500 }
        );
    }
}
