import type { ElementNode, LexicalEditor, RangeSelection } from "lexical";
import { $isRootNode, $isTextNode, TextNode, $isParagraphNode } from "lexical";
import { $isLinkNode, TOGGLE_LINK_COMMAND } from '@lexical/link';
import { $isAtNodeEnd } from '@lexical/selection';

export const replaceLink = (selection: RangeSelection, editor: LexicalEditor, replaceLink: string, replaceText?: string) => {
    // "selection" has an entire paragraph, not a selection
    // use "extract" to extract the selection
    //
    // Text labels are changed up to "TOGGLE_LINK_COMMAND"
    const nodes = selection.extract()
    if (nodes.filter(v => $isParagraphNode(v)).length > 1) {
        return
    }
    if (nodes.length === 0) {
        selection.insertText(replaceText || '')
    }
    if (nodes.length === 1 && $isParagraphNode(nodes[0])) {
        const textNode = new TextNode(replaceText || '')
        nodes[0].append(textNode)
    }
    let inserted = false // only one node remains and other nodes will be removed
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

// Get the starting node in the selection
export function getSelectedNode(
    selection: RangeSelection,
): TextNode | ElementNode {
    const anchor = selection.anchor; // starting point (cursor point)
    const focus = selection.focus; // selection(dragging) point
    const anchorNode = selection.anchor.getNode();
    const focusNode = selection.focus.getNode();
    if (anchorNode === focusNode) {
        return anchorNode;
    }
    const isBackward = selection.isBackward();
    if (isBackward) {
        return $isAtNodeEnd(focus) ? anchorNode : focusNode;
    } else {
        return $isAtNodeEnd(anchor) ? anchorNode : focusNode;
    }
}