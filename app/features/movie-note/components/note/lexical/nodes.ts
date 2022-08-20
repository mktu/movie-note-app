import { HeadingNode, QuoteNode, } from "@lexical/rich-text";
import { ListItemNode, ListNode } from "@lexical/list";
import type { Klass, LexicalNode } from "lexical";

const nodes: Klass<LexicalNode>[] = [HeadingNode, QuoteNode, ListItemNode, ListNode];

export default nodes