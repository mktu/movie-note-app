import type { LexicalEditor, RangeSelection } from "lexical";
import { $isRootNode, $isTextNode, TextNode } from "lexical";
import { $isLinkNode, TOGGLE_LINK_COMMAND } from '@lexical/link';


export const replaceLink = (selection: RangeSelection, editor: LexicalEditor, replaceLink: string, replaceText?: string) => {
    // "selection" has an entire paragraph, not a selection
    // use "extract" to extract the selection
    //
    // Text labels are changed up to "TOGGLE_LINK_COMMAND"
    const nodes = selection.extract()
    if (nodes.length === 0) {
        selection.insertText(replaceText || '')
    }
    let inserted = false
    nodes.forEach(node => {
        if ($isRootNode(node)) {
            const textNode = new TextNode(replaceText || '')
            node.insertBefore(textNode)
        }
        const parent = node.getParent()
        // remove parent link if parent was a link
        if ($isLinkNode(parent) && parent.isAttached()) {
            const children = parent.getChildren();
            for (let i = 0; i < children.length; i++) {
                parent.insertBefore(children[i]);
            }
            parent.remove()
        }
        // remove text/link nodes in selection
        if (($isTextNode(node) || $isLinkNode(node)) && node.isAttached()) {
            if (!inserted) {
                const textNode = new TextNode(replaceText || '')
                node.insertBefore(textNode)
            }
            node.remove()
            inserted = true
        }
    })
    editor.dispatchCommand(TOGGLE_LINK_COMMAND, replaceLink);
}

export const unlink = (selection: RangeSelection, editor: LexicalEditor) => {
    const nodes = selection.extract()
    nodes.forEach(node => {
        const parent = node.getParent()
        // remove parent link if parent was a link
        if ($isLinkNode(parent) && parent.isAttached()) {
            const children = parent.getChildren();
            for (let i = 0; i < children.length; i++) {
                parent.insertBefore(children[i]);
            }
            parent.remove()
        }
        // remove text/link nodes in selection
        if (($isLinkNode(node)) && node.isAttached()) {
            node.remove()
        }
    })
}