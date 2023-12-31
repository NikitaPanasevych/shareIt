import { NavLinks } from '@/constants/index';
import Image from '@/node_modules/next/image';
import Link from '@/node_modules/next/link';
import React from 'react';
import AuthProviders from './AuthProviders';
import { getCurrentUser } from '@/lib/session';
import ProfileMenu from './ProfileMenu';

export default async function Navbar() {
	const session = await getCurrentUser();

	return (
		<nav className="flexBetween navbar">
			<div className="flexStart gap-10 flex-1">
				<Link href="/">
					<Image src="/Logo (1).svg" height={50} width={50} alt="shareIt"></Image>
				</Link>
				<ul className="xl:hidden text-small gap-7">
					{NavLinks.map((link) => (
						<li className="" key={link.key}>
							<Link href={link.href}>{link.text}</Link>
						</li>
					))}
				</ul>
			</div>
			<div className="flexCenter gap-4">
				{session?.user ? (
					<>
						<ProfileMenu session={session} />

						<Link href="/create-project">Share work</Link>
					</>
				) : (
					<AuthProviders />
				)}
			</div>
		</nav>
	);
}
