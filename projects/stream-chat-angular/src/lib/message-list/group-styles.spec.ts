import { mockMessage } from '../mocks';
import { StreamMessage } from '../types';
import { getGroupStyles } from './group-styles';

describe('getGroupStyles', () => {
  let messages: StreamMessage[];

  beforeEach(() => {
    messages = [
      mockMessage(),
      mockMessage(),
      mockMessage(),
      mockMessage(),
      mockMessage(),
    ];
  });

  it('should mark messages as "single", if grouping is turned off', () => {
    expect(getGroupStyles(messages[0], undefined, messages[1], true)).toBe(
      'single'
    );

    expect(getGroupStyles(messages[1], messages[0], messages[2], true)).toBe(
      'single'
    );

    expect(getGroupStyles(messages[2], messages[1], undefined, true)).toBe(
      'single'
    );
  });

  it('should mark error messages as "single"', () => {
    messages[1].type = 'error';

    expect(getGroupStyles(messages[1], messages[0], messages[2])).toBe(
      'single'
    );
  });

  it('should mark messages with attachements as "single"', () => {
    messages[0].attachments = [{}, {}];

    expect(getGroupStyles(messages[0], undefined, messages[1])).toBe('single');
  });

  it('should mark first message of the day as "top"', () => {
    messages[0].created_at.setDate(messages[0].created_at.getDate() - 1);

    expect(getGroupStyles(messages[1], messages[0], messages[2])).toBe('top');
  });

  it('should mark last message of the day as "bottom"', () => {
    messages[2].created_at.setDate(messages[0].created_at.getDate() + 1);

    expect(getGroupStyles(messages[1], messages[0], messages[2])).toBe(
      'bottom'
    );
  });

  it('should handle system messages', () => {
    messages[2].type = 'system';

    expect(getGroupStyles(messages[1], messages[0], messages[2])).toBe(
      'bottom'
    );

    expect(getGroupStyles(messages[2], messages[1], messages[3])).toBe(
      'middle'
    );

    expect(getGroupStyles(messages[3], messages[2], messages[4])).toBe('top');
  });

  it('should handle deleted messages', () => {
    messages[2].deleted_at = new Date().toISOString();

    expect(getGroupStyles(messages[1], messages[0], messages[2])).toBe(
      'bottom'
    );

    expect(getGroupStyles(messages[2], messages[1], messages[3])).toBe(
      'single'
    );

    expect(getGroupStyles(messages[3], messages[2], messages[4])).toBe('top');
  });

  it(`shouldn't group together messages with different authors `, () => {
    messages[0].user!.id = 'not' + messages[0].user!.id;
    messages[4].user!.id = 'not' + messages[4].user!.id;

    expect(getGroupStyles(messages[1], messages[0], messages[2])).toBe('top');

    expect(getGroupStyles(messages[2], messages[1], messages[3])).toBe(
      'middle'
    );

    expect(getGroupStyles(messages[3], messages[2], messages[4])).toBe(
      'bottom'
    );
  });

  it('should start new group if a message has reaction', () => {
    messages[1].reaction_counts = { wow: 1 };

    expect(getGroupStyles(messages[0], undefined, messages[1])).toBe('single');

    expect(getGroupStyles(messages[1], messages[0], messages[2])).toBe('top');
  });
});
