export enum LinkType {
  Generic = 'generic',
  Video = 'video',
  Pinterest = 'pinterest',
}

export enum SupportedType {
  'youtube.com' = LinkType.Video,
  'youtu.be' = LinkType.Video,
  'vimeo.com' = LinkType.Video,
  'pinterest.com.au' = LinkType.Pinterest,
  'pinterest.com' = LinkType.Pinterest,
}
