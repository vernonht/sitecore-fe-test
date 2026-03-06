import { timeAgo, getInitials, getBackgroundColor, toPlurals } from '@/lib/helpers';

describe('helpers', () => {
  describe('timeAgo', () => {
    beforeEach(() => {
      // Mock Date.now() for consistent testing
      jest.useFakeTimers();
    });

    afterEach(() => {
      jest.useRealTimers();
    });

    it('should return seconds when time difference is less than 60 seconds', () => {
      const now = new Date('2026-03-06T12:00:00Z');
      jest.setSystemTime(now);
      
      const pastDate = new Date('2026-03-06T11:59:30Z').toISOString();
      expect(timeAgo(pastDate)).toBe('30s');
    });

    it('should return minutes when time difference is less than 60 minutes', () => {
      const now = new Date('2026-03-06T12:00:00Z');
      jest.setSystemTime(now);
      
      const pastDate = new Date('2026-03-06T11:45:00Z').toISOString();
      expect(timeAgo(pastDate)).toBe('15m');
    });

    it('should return hours when time difference is less than 24 hours', () => {
      const now = new Date('2026-03-06T12:00:00Z');
      jest.setSystemTime(now);
      
      const pastDate = new Date('2026-03-06T09:00:00Z').toISOString();
      expect(timeAgo(pastDate)).toBe('3h');
    });

    it('should return days when time difference is less than 7 days', () => {
      const now = new Date('2026-03-06T12:00:00Z');
      jest.setSystemTime(now);
      
      const pastDate = new Date('2026-03-02T12:00:00Z').toISOString();
      expect(timeAgo(pastDate)).toBe('4d');
    });

    it('should return weeks when time difference is less than 52 weeks', () => {
      const now = new Date('2026-03-06T12:00:00Z');
      jest.setSystemTime(now);
      
      const pastDate = new Date('2026-02-06T12:00:00Z').toISOString();
      expect(timeAgo(pastDate)).toBe('4w');
    });

    it('should return years when time difference is 52 weeks or more', () => {
      const now = new Date('2026-03-06T12:00:00Z');
      jest.setSystemTime(now);
      
      const pastDate = new Date('2025-03-06T12:00:00Z').toISOString();
      expect(timeAgo(pastDate)).toBe('1y');
    });

    it('should return 0s for current time', () => {
      const now = new Date('2026-03-06T12:00:00Z');
      jest.setSystemTime(now);
      
      expect(timeAgo(now.toISOString())).toBe('0s');
    });
  });

  describe('getInitials', () => {
    it('should return initials from a single name', () => {
      expect(getInitials('John')).toBe('J');
    });

    it('should return initials from multiple names', () => {
      expect(getInitials('John Doe')).toBe('JD');
    });

    it('should return initials from three names', () => {
      expect(getInitials('John Michael Doe')).toBe('JMD');
    });

    it('should handle lowercase names', () => {
      expect(getInitials('john doe')).toBe('JD');
    });

    it('should handle mixed case names', () => {
      expect(getInitials('jOhN dOe')).toBe('JD');
    });

    it('should handle names with extra spaces', () => {
      expect(getInitials('John  Doe')).toBe('JD');
    });

    it('should handle single character names', () => {
      expect(getInitials('a b c')).toBe('ABC');
    });
  });

  describe('getBackgroundColor', () => {
    it('should return a color from the colors array', () => {
      const color = getBackgroundColor('John');
      expect(typeof color).toBe('string');
      expect(color).toMatch(/^#[0-9a-f]{6}$/i);
    });

    it('should return consistent color for the same name', () => {
      const color1 = getBackgroundColor('John');
      const color2 = getBackgroundColor('John');
      expect(color1).toBe(color2);
    });

    it('should return different colors for different starting letters', () => {
      const colorA = getBackgroundColor('Alice');
      const colorB = getBackgroundColor('Bob');
      
      expect(typeof colorA).toBe('string');
      expect(colorA).toBe('#ef4444');
      expect(typeof colorB).toBe('string');
      expect(colorB).toBe('#f97316');
    });
  });

  describe('toPlurals', () => {
    it('should return singular unit when count is 1', () => {
      expect(toPlurals(1, 'like')).toBe('like');
    });

    it('should return plural unit when count is 0', () => {
      expect(toPlurals(0, 'like')).toBe('likes');
    });

    it('should return plural unit when count is greater than 1', () => {
      expect(toPlurals(2, 'like')).toBe('likes');
      expect(toPlurals(10, 'comment')).toBe('comments');
      expect(toPlurals(100, 'post')).toBe('posts');
    });

    it('should handle different units', () => {
      expect(toPlurals(1, 'day')).toBe('day');
      expect(toPlurals(2, 'day')).toBe('days');
      expect(toPlurals(1, 'week')).toBe('week');
      expect(toPlurals(3, 'week')).toBe('weeks');
    });

    it('should handle negative counts', () => {
      expect(toPlurals(-1, 'item')).toBe('items');
      expect(toPlurals(-5, 'item')).toBe('items');
    });
  });
});
