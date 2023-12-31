import { CodedocConfig } from '@codedoc/core';
import { Footer as _Footer, Icon } from '@codedoc/core/components';


export function Footer(config: CodedocConfig, renderer: any) {
  return <_Footer>

    <a href="https://alexeisrour.github.io/_feed.rss" target="_blank">
	  <Icon>rss_feed</Icon> RSS
    </a>
    <a href="https://alexeisrour.github.io/_feed.json" target="_blank">
	  <Icon>json_feed</Icon> JSON
    </a>
    <a href="https://alexeisrour.github.io/_feed.atom" target="_blank">
	  <Icon>atom_feed</Icon> ATOM
    </a>
  </_Footer>;
}
