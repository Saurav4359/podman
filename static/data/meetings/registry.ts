import * as markDownFiles from '@site/static/data/meetings/notes/index';

export type MeetingType = 'community' | 'cabal';

export type MeetingRecord = {
  slug: string;
  title: string;
  dateLabel: string;
  type: MeetingType;
  recordingUrl?: string;
  module: (typeof markDownFiles)[keyof typeof markDownFiles];
};

function exportKeyToSlug(key: string): string {
  const match = key.match(/^F(\d{4})(\d{2})(\d{2})$/);
  if (!match) {
    return key.toLowerCase();
  }
  return `${match[1]}-${match[2]}-${match[3]}`;
}

function extractRecordingUrl(mdFile: MeetingRecord['module']): string | undefined {
  const mdReader = mdFile?.default?.({ current: null });
  const children = mdReader?.props?.children;

  if (!Array.isArray(children)) {
    return undefined;
  }

  for (const child of children) {
    const field1 = child?.props?.children?.[0];
    const field2 = child?.props?.children?.[1];

    if (
      typeof field1 === 'string' &&
      (field1.includes('BlueJeans') || field1.includes('Video'))
    ) {
      return field2?.props?.href;
    }
  }

  return undefined;
}

function extractDateLabel(mdFile: MeetingRecord['module']): string {
  const tocValue = mdFile?.toc?.[0]?.value;
  if (typeof tocValue === 'string') {
    return tocValue.split(/[0-9]{2}:[0-9]{2}/)[0].trim();
  }

  return mdFile?.contentTitle ?? 'Meeting';
}

function buildMeetingRecord(key: string, mdFile: MeetingRecord['module']): MeetingRecord {
  const title = mdFile?.contentTitle ?? 'Podman Community Meeting';
  const type: MeetingType = title.includes('Cabal') ? 'cabal' : 'community';

  return {
    slug: exportKeyToSlug(key),
    title,
    dateLabel: extractDateLabel(mdFile),
    type,
    recordingUrl: extractRecordingUrl(mdFile),
    module: mdFile,
  };
}

const meetings: MeetingRecord[] = Object.entries(markDownFiles)
  .map(([key, mdFile]) => buildMeetingRecord(key, mdFile))
  .sort((a, b) => b.slug.localeCompare(a.slug));

export function getMeetingBySlug(slug: string | undefined): MeetingRecord | undefined {
  if (!slug) {
    return undefined;
  }
  return meetings.find(meeting => meeting.slug === slug);
}

export function getMeetingsByType(type?: MeetingType): MeetingRecord[] {
  if (!type) {
    return meetings;
  }
  return meetings.filter(meeting => meeting.type === type);
}

export function getMeetingPath(slug: string): string {
  return `/community/meetings/${slug}`;
}
