import type { ElementNode, LexicalNode } from "lexical";
import { $isElementNode } from "lexical"

export const flattenNodes: (nodes: LexicalNode[]) => LexicalNode[] = (nodes) => {
    let results: LexicalNode[] = [...nodes]
    const elements = nodes.filter(n => $isElementNode(n)).map(n => n as ElementNode)
    elements.forEach(v => {
        const children = v.getChildren()
        const elements = children.filter(c => $isElementNode(c)).map(c => c as ElementNode)
        const notElements = children.filter(c => !$isElementNode(c))
        results = [...results, ...notElements, ...flattenNodes(elements)]
    })
    return results
}