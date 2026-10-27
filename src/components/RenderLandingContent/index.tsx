import parse, {
    Element,
    domToReact,
    HTMLReactParserOptions,
} from 'html-react-parser';
import Link from 'next/link';

interface Props {
    content: string;
}

export default function RenderLandingContent({ content }: Props) {
    const options: HTMLReactParserOptions = {
        replace: (domNode) => {
            if (domNode instanceof Element && domNode.name === 'a') {
                const { href, target, rel, ...attribs } = domNode.attribs;

                const isInternal =
                    href && (href.startsWith('/') || href.startsWith('#'));

                if (isInternal) {
                    return (
                        <Link href={href} {...attribs}>
                            {domToReact(domNode.children as any, options)}
                        </Link>
                    );
                }

                return (
                    <a
                        href={href}
                        target={target || '_blank'}
                        rel={rel || 'noopener noreferrer'}
                        {...attribs}
                    >
                        {domToReact(domNode.children as any, options)}
                    </a>
                );
            }
        },
    };

    return (
        <div className='landing-content-wrapper'>{parse(content, options)}</div>
    );
}