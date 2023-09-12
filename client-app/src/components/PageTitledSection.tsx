import { ReactNode } from "react";
import { PageTitleSpan } from "./PageTitleSpan";

export function PageTitledSection(props: {
    title: string,
    children: ReactNode
}) {
    return (
        <div 
            className="flex flex-col w-full gap-3"
            style={{
                minHeight: '30rem'
            }}
        >
            <PageTitleSpan>{props.title}</PageTitleSpan>
            {props.children}
        </div>
    );
}
