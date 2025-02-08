type Greeting = 'good_morning' | 'good_afternoon' | 'good_evening' | 'good_night';

export const getGreeting = (): Greeting => {
    const hour = new Date().getHours();
    
    if (hour >= 6 && hour < 12) {
        return 'good_morning';
    } else if (hour >= 12 && hour < 18) {
        return 'good_afternoon';
    } else if (hour >= 18 && hour < 24) {
        return 'good_evening';
    } else {
        return 'good_night';
    }
};
