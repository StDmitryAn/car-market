'use client';

import { signOut } from 'next-auth/react';
import React from 'react';

export default function SignOutButton() {
    return (
        <div className="flex justify-center items-center">
            <button
                onClick={() => signOut()}
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            >
                Sign out
            </button>
        </div>
    );
}
