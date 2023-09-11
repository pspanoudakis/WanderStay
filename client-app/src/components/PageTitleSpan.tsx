import { ReactNode } from "react";

export function PageTitleSpan(props: {
    children: ReactNode
}) {
    return <span className="font-normal text-2xl">{props.children}</span>;
}
