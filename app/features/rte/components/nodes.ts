import { AutoLinkNode, LinkNode } from '@lexical/link';
import { ListItemNode, ListNode } from '@lexical/list';
import { HEADING, ORDERED_LIST, QUOTE, UNORDERED_LIST, TEXT_FORMAT_TRANSFORMERS } from '@lexical/markdown';
import { HeadingNode, QuoteNode } from '@lexical/rich-text';
import { TableCellNode, TableNode, TableRowNode } from '@lexical/table';

import type { Klass, LexicalNode } from "lexical";
import { ImageNode } from '../features/images/components';
import { LinkPreviewNode, YoutubePreviewNode, TwitterPreviewNode } from '../features/link';

//HEADING, QUOTE, CODE, UNORDERED_LIST, ORDERED_LIST
const nodes: Klass<LexicalNode>[] = [
    HeadingNode, QuoteNode, ListItemNode, ListNode, LinkNode, AutoLinkNode,
    TableCellNode, TableNode, TableRowNode, LinkPreviewNode, YoutubePreviewNode, TwitterPreviewNode, ImageNode];



export const transformers = [
    HEADING, QUOTE, UNORDERED_LIST, ORDERED_LIST,
    ...TEXT_FORMAT_TRANSFORMERS
]
export default nodes