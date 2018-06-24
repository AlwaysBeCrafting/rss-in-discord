## Display Mode:

- (default) Links only mode to take advantage of Discords automatic link expansion
- Preview Mode: List the description provided by the feed
- Full Article: Print the text content for each feed item

## Structure of a Post

### Links Only Mode:

    http://link_to_feed_item.com/
    Source
    <link.xml>

### Preview Mode:

    **Article Title**
    Source
    <link.xml>

    Description
    **<http://link_to_feed_item.com/>**

### Full Article

    **Article Title**
    Source
    <link.xml>

    **<http://link_to_feed_item.com/>**
    Full Article Text

## Interaction

- Reaction Toolbar: Each feed item has an emoji toolbar to allow for interacting with the feed content

### Reactions

Bot provides a set of reactions to each post for actions that can be taken in that context. For example: unsubscribe from a feed, select a menu item by letter, etc.

When the bot provides feedback for an action the existing post is edited and any new options replace the existing ones.

### Commands

- `!sub [feed]`
- `!unsub [feed]`
- `!settings`
- `!help`
