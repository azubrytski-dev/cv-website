import { render, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { CssBaseline, ThemeProvider } from '@mui/material';
import Experience from './Experience';
import { darkTheme, lightTheme } from '../themes/themes';
import { getExperienceInformation } from '../services/portfolio.service';

function renderExperience(theme = darkTheme) {
  render(
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Experience />
    </ThemeProvider>,
  );
  return screen.getAllByRole('button', { name: /^View role details:/ });
}

describe.each([
  { mode: 'dark', theme: darkTheme },
  { mode: 'light', theme: lightTheme },
])('$mode theme', ({ theme }) => {
  it.each(['close button', 'Escape', 'backdrop'] as const)(
    'returns focus to the details button after dismissal with %s',
    async (dismissal) => {
      const user = userEvent.setup();
      const cards = renderExperience(theme);
      // Use different roles to catch accidentally restoring focus to the first one.
      const index = ['close button', 'Escape', 'backdrop'].indexOf(dismissal);
      const trigger = cards[index];
      await user.click(trigger);

      const dialog = screen.getByRole('dialog');
      expect(within(dialog).getByText('Responsibilities:')).toBeInTheDocument();
      for (const tech of getExperienceInformation()[index].techStack.split(',')) {
        expect(within(dialog).getByText(tech.trim())).toBeInTheDocument();
      }

      if (dismissal === 'close button') {
        await user.click(within(dialog).getByRole('button', { name: 'Close' }));
      } else if (dismissal === 'Escape') {
        await user.keyboard('{Escape}');
      } else {
        // Dialog's full-screen container is the clickable area outside its paper.
        await user.click(dialog.parentElement!);
      }

      await waitFor(() => expect(screen.queryByRole('dialog')).not.toBeInTheDocument());
      expect(trigger).toHaveFocus();
    },
  );

  it.each(['{Enter}', ' '])('opens the focused role details button with %s and restores keyboard focus', async (key) => {
    const user = userEvent.setup();
    const [trigger] = renderExperience(theme);
    await user.tab();
    expect(trigger).toHaveFocus();
    await user.keyboard(key);
    expect(screen.getByRole('dialog')).toBeInTheDocument();
    await user.keyboard('{Escape}');
    await waitFor(() => expect(screen.queryByRole('dialog')).not.toBeInTheDocument());
    expect(trigger).toHaveFocus();
  });
});
