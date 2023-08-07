'use client';

import Link from 'next/link';
import Image from 'next/image';
import React, { useCallback, useRef } from 'react';
import { useRouter } from 'next/navigation';

export default function Modal({ children }: { children: React.ReactNode }) {
	const overlay = useRef<HTMLDivElement>(null);
	const wrapper = useRef<HTMLDivElement>(null);
	const router = useRouter();

	const onDismiss = useCallback(() => {
		router.push('/');
	}, [router]);

	const handleClick = useCallback(
		(e: React.MouseEvent) => {
			if (e.target === overlay.current && onDismiss) {
				onDismiss();
			}
		},
		[onDismiss, overlay]
	);

	return (
		<div ref={overlay} className="modal" onClick={handleClick}>
			<button type="button" onClick={onDismiss} className="absolute top-4 right-8">
				<Image src="/close.svg" height={20} width={20} alt="close" />
			</button>
			<div ref={wrapper} className="modal_wrapper">
				{children}
			</div>
		</div>
	);
}
