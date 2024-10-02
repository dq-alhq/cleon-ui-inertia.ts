import { IconDesktop, IconMoon, IconSun } from 'cleon-icons'
import { Button } from 'ui'

import { useTheme } from '@/components/theme-provider'

export function ThemeToggle() {
    const { theme, setTheme } = useTheme()

    return (
        <div className='flex items-center gap-x-1 [&_svg]:size-4'>
            <Button size='icon' variant={theme === 'light' ? 'primary' : 'outline'} onPress={() => setTheme('light')}>
                <IconSun />
            </Button>
            <Button size='icon' variant={theme === 'dark' ? 'primary' : 'outline'} onPress={() => setTheme('dark')}>
                <IconMoon />
            </Button>
            <Button size='icon' variant={theme === 'system' ? 'primary' : 'outline'} onPress={() => setTheme('system')}>
                <IconDesktop />
            </Button>
        </div>
    )
}
