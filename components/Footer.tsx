import React from 'react';
import Image from '@/node_modules/next/image';
import { footerLinks } from '@/constants/index';
import Link from '@/node_modules/next/link';

interface Props {
	Title: string;
	Links: string[];
}

const FooterColumn = ({ Title, Links }: Props) => {
	return (
		<div className="footer_column">
			<h4 className="font-semibold">{Title}</h4>
			<ul className="flex flex-col gap-2 font-normal">
				{Links.map((link) => (
					<Link href={link} key={link}>
						{link}
					</Link>
				))}
			</ul>
		</div>
	);
};

export default function Footer() {
	return (
		<footer className="flexStart footer">
			<div className="flex flex-col w-full gap-12">
				<div className="flex items-start flex-col">
					<Image src="/Logo.png" alt="ShareIt" height={50} width={50} />
					<p className="text-start text-sm font-normal mt-5 max-w-xs">
						Share your work with the world and get feedback from your peers.
					</p>
				</div>
				<div className="flex flex-wrap gap-12">
					<FooterColumn Title={footerLinks[0].title} Links={footerLinks[0].links} />
					<div className="flex-1 flex flex-col gap-4">
						<FooterColumn Title={footerLinks[1].title} Links={footerLinks[1].links} />
						<FooterColumn Title={footerLinks[2].title} Links={footerLinks[3].links} />
					</div>
					<FooterColumn Title={footerLinks[3].title} Links={footerLinks[3].links} />
					<div className="flex-1 flex flex-col gap-4">
						<FooterColumn Title={footerLinks[4].title} Links={footerLinks[4].links} />
						<FooterColumn Title={footerLinks[5].title} Links={footerLinks[5].links} />
					</div>
					<FooterColumn Title={footerLinks[6].title} Links={footerLinks[6].links} />
				</div>
			</div>

			<div className="flexBetween footer_copyright">
				<p>@ 2023 ShareIt all rights reserved</p>
				<p className="text-grey">
					<span className="text-black font-semibold">684</span>
					projects uploaded
				</p>
			</div>
		</footer>
	);
}
