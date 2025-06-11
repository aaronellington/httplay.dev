import { useLocation } from "preact-iso"

export type LinkProps = {
    href: string
    className?: string
    activeClassName?: string
    children: any
}

export function Link(props: LinkProps) {
    let className = ""
    if (props.className) {
        className += ` ${props.className}`
    }
    if (useLocation().url === props.href) {
        className += ` ${props.activeClassName}`
    }

    return <a href={props.href} className={className} >
        {props.children}
    </a>;
}
