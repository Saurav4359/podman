import React, { useMemo, useState } from 'react';
import Link from '@docusaurus/Link';
import { Icon } from '@iconify/react';
import YouTubeIcon from '@site/src/components/ui/YouTubeIcon';
import {
  getMeetingPath,
  getMeetingsByType,
  type MeetingRecord,
  type MeetingType,
} from '@site/static/data/meetings/registry';

type FilterId = 'all' | MeetingType;

const filters: { id: FilterId; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'community', label: 'Community' },
  { id: 'cabal', label: 'Cabal' },
];

function groupMeetingsByYear(meetingList: MeetingRecord[]) {
  return meetingList.reduce<Record<string, MeetingRecord[]>>((groups, meeting) => {
    const year = meeting.slug.slice(0, 4);
    groups[year] = groups[year] ?? [];
    groups[year].push(meeting);
    return groups;
  }, {});
}

function MeetingMinutesArchive() {
  const [activeFilter, setActiveFilter] = useState<FilterId>('all');

  const filteredMeetings = useMemo(() => {
    if (activeFilter === 'all') {
      return getMeetingsByType();
    }
    return getMeetingsByType(activeFilter);
  }, [activeFilter]);

  const groupedMeetings = useMemo(() => groupMeetingsByYear(filteredMeetings), [filteredMeetings]);
  const years = Object.keys(groupedMeetings).sort((a, b) => Number(b) - Number(a));

  return (
    <div className="features-page meeting-minutes-page">
      <div className="features-shell">
        <nav className="meeting-minutes-breadcrumb" aria-label="Breadcrumb">
          <Link to="/community">Community</Link>
          <span aria-hidden="true">/</span>
          <span>Meeting minutes</span>
        </nav>

        <header className="meeting-minutes-header">
          <h1 className="meeting-minutes-header__title">Meeting minutes</h1>
          <p className="meeting-minutes-header__subtitle">
            Browse notes from Podman community and cabal meetings. Each entry has its own shareable page.
          </p>
        </header>

        <div className="meeting-minutes-filters" role="tablist" aria-label="Filter meetings">
          {filters.map(filter => (
            <button
              key={filter.id}
              type="button"
              role="tab"
              aria-selected={activeFilter === filter.id}
              className={`meeting-minutes-filters__button${
                activeFilter === filter.id ? ' meeting-minutes-filters__button--active' : ''
              }`}
              onClick={() => setActiveFilter(filter.id)}
            >
              {filter.label}
            </button>
          ))}
        </div>

        <div className="meeting-minutes-archive">
          {years.map(year => (
            <section key={year} className="meeting-minutes-year">
              <h2 className="meeting-minutes-year__title">{year}</h2>
              <ul className="meeting-minutes-list">
                {groupedMeetings[year].map(meeting => (
                  <li key={meeting.slug} className="meeting-minutes-list__item">
                    <div className="meeting-minutes-list__main">
                      <span className={`meeting-badge meeting-badge--${meeting.type}`}>
                        {meeting.type === 'cabal' ? 'Cabal' : 'Community'}
                      </span>
                      <div className="meeting-minutes-list__copy">
                        <Link to={getMeetingPath(meeting.slug)} className="meeting-minutes-list__title">
                          {meeting.dateLabel}
                        </Link>
                        <p className="meeting-minutes-list__meta">{meeting.title}</p>
                      </div>
                    </div>
                    <div className="meeting-minutes-list__links">
                      <Link to={getMeetingPath(meeting.slug)} className="meeting-minutes-list__link">
                        <Icon icon="material-symbols:article-outline-rounded" aria-hidden="true" />
                        Notes
                      </Link>
                      {meeting.recordingUrl ? (
                        <a
                          href={meeting.recordingUrl}
                          className="meeting-minutes-list__link"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <YouTubeIcon className="meeting-minutes-list__link-icon meeting-minutes-list__link-icon--youtube" />
                          Recording
                        </a>
                      ) : null}
                    </div>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}

export default MeetingMinutesArchive;
