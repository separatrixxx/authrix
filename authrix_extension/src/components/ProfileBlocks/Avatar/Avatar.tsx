import { AvatarProps } from './Avatar.props';
import styles from './Avatar.module.css';
import { useEffect, useRef } from 'react';
import * as jdenticon from 'jdenticon';


export const Avatar = ({ username, size }: AvatarProps): JSX.Element => {
    const svgRef = useRef<SVGSVGElement>(null);

    useEffect(() => {
        if (svgRef.current) {
            jdenticon.update(svgRef.current, username);
        }
    }, [username]);

    return (
        <svg className={styles.avatar}
            ref={svgRef}
            width={size}
            height={size}
            data-jdenticon-value={username}
        />
    );
};