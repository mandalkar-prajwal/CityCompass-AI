import { CommunityReport, Place } from '../types';
import { INITIAL_REPORTS } from '../data/initialReports';

const REPORTS_KEY = 'citycompass_reports_v1';
const UPVOTED_KEY = 'citycompass_upvoted_v1';
const COMPARE_KEY = 'citycompass_compared_v1';
const BOOKMARKS_KEY = 'citycompass_bookmarks_v1';

export function getStoredReports(): CommunityReport[] {
  try {
    const data = localStorage.getItem(REPORTS_KEY);
    if (!data) {
      localStorage.setItem(REPORTS_KEY, JSON.stringify(INITIAL_REPORTS));
      return INITIAL_REPORTS;
    }
    const parsed = JSON.parse(data);
    return Array.isArray(parsed) ? parsed : INITIAL_REPORTS;
  } catch (err) {
    console.error('Failed to load reports from localStorage:', err);
    return INITIAL_REPORTS;
  }
}

export function saveReport(report: CommunityReport): CommunityReport[] {
  try {
    const current = getStoredReports();
    const updated = [report, ...current];
    localStorage.setItem(REPORTS_KEY, JSON.stringify(updated));
    return updated;
  } catch (err) {
    console.error('Failed to save report to localStorage:', err);
    return getStoredReports();
  }
}

export function getUpvotedReportIds(): string[] {
  try {
    const data = localStorage.getItem(UPVOTED_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

export function toggleUpvoteReport(reportId: string): { updatedReports: CommunityReport[]; hasUpvoted: boolean } {
  try {
    const upvoted = getUpvotedReportIds();
    const isAlreadyUpvoted = upvoted.includes(reportId);
    let newUpvoted: string[];

    if (isAlreadyUpvoted) {
      newUpvoted = upvoted.filter(id => id !== reportId);
    } else {
      newUpvoted = [...upvoted, reportId];
    }
    localStorage.setItem(UPVOTED_KEY, JSON.stringify(newUpvoted));

    const reports = getStoredReports();
    const updatedReports = reports.map(r => {
      if (r.id === reportId) {
        return {
          ...r,
          upvotes: isAlreadyUpvoted ? Math.max(0, r.upvotes - 1) : r.upvotes + 1
        };
      }
      return r;
    });

    localStorage.setItem(REPORTS_KEY, JSON.stringify(updatedReports));
    return { updatedReports, hasUpvoted: !isAlreadyUpvoted };
  } catch (err) {
    console.error('Error toggling upvote:', err);
    return { updatedReports: getStoredReports(), hasUpvoted: false };
  }
}

export function getComparedPlaceIds(): string[] {
  try {
    const data = localStorage.getItem(COMPARE_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

export function toggleComparePlace(placeId: string): string[] {
  try {
    const current = getComparedPlaceIds();
    let updated: string[];
    if (current.includes(placeId)) {
      updated = current.filter(id => id !== placeId);
    } else {
      if (current.length >= 3) {
        // limit to 3 items
        updated = [...current.slice(1), placeId];
      } else {
        updated = [...current, placeId];
      }
    }
    localStorage.setItem(COMPARE_KEY, JSON.stringify(updated));
    return updated;
  } catch {
    return [];
  }
}

export function clearComparedPlaces(): void {
  localStorage.removeItem(COMPARE_KEY);
}

export function getBookmarkedPlaceIds(): string[] {
  try {
    const data = localStorage.getItem(BOOKMARKS_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

export function toggleBookmarkPlace(placeId: string): string[] {
  try {
    const current = getBookmarkedPlaceIds();
    const updated = current.includes(placeId) 
      ? current.filter(id => id !== placeId)
      : [...current, placeId];
    localStorage.setItem(BOOKMARKS_KEY, JSON.stringify(updated));
    return updated;
  } catch {
    return [];
  }
}
