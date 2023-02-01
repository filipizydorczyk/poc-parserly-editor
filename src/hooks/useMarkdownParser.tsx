import {
    MarkdownParser,
    MarkdownElementsFactory,
    ImageMarkdownElement,
    LinkMarkdownElement,
    ParagraphMarkdownElement,
    TextMarkdownElement,
    HorizontalRuleMarkdownElement,
} from "parserly";
import { useEffect, useState } from "react";

class MarkdownFactory implements MarkdownElementsFactory<JSX.Element> {
    createLink(element: LinkMarkdownElement) {
        return <a href={element.url.href}>{element.title}</a>;
    }
    createImg(element: ImageMarkdownElement) {
        return <img src={element.url.href} alt={element.alt} />;
    }
    createTxt(element: TextMarkdownElement) {
        if (element.type === "h1") return <h1>{element.content}</h1>;
        if (element.type === "h2") return <h2>{element.content}</h2>;
        if (element.type === "h3") return <h3>{element.content}</h3>;
        if (element.type === "bold") return <strong>{element.content}</strong>;
        if (element.type === "italic") return <em>{element.content}</em>;
        if (element.type === "strikethrough") return <s>{element.content}</s>;
        if (element.type === "code") return <code>{element.content}</code>;
        if (element.type === "blockquote")
            return <blockquote>{element.content}</blockquote>;
        if (element.type === "normal") return <>{element.content}</>;
        return <></>;
    }
    createHRule(element: HorizontalRuleMarkdownElement) {
        return <hr />;
    }
    createParagraph(element: ParagraphMarkdownElement) {
        return (
            <p>
                {element.content.map((e) => {
                    const img = e as ImageMarkdownElement;
                    const link = e as LinkMarkdownElement;
                    const txt = e as TextMarkdownElement;

                    if (img.alt) return this.createImg(img);
                    if (link.title) return this.createLink(link);
                    if (txt.type) return this.createTxt(txt);

                    return <></>;
                })}
            </p>
        );
    }
}

const useMarkdownParser = (content: string) => {
    const factory = new MarkdownFactory();
    const parser = new MarkdownParser<JSX.Element>(factory);
    const [markdownComponents, setMarkdownComponents] = useState<JSX.Element[]>(
        []
    );

    useEffect(() => {
        setMarkdownComponents(parser.parse(content));
    }, [content]);

    return [markdownComponents];
};

export default useMarkdownParser;
