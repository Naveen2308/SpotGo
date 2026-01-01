import React from 'react';
import { View, StyleSheet, ViewProps, SafeAreaView, StatusBar, Platform } from 'react-native';
import { Colors } from '../../constants/Colors';

interface ContainerProps extends ViewProps {
    safe?: boolean;
    centered?: boolean;
    padded?: boolean;
}

export const Container: React.FC<ContainerProps> = ({
    children,
    style,
    safe = false,
    centered = false,
    padded = true,
    ...props
}) => {
    const Wrapper = safe ? SafeAreaView : View;

    return (
        <Wrapper
            style={[
                styles.base,
                safe && styles.safe,
                centered && styles.centered,
                padded && styles.padded,
                style
            ]}
            {...props}
        >
            <StatusBar barStyle="light-content" backgroundColor={Colors.background} />
            {children}
        </Wrapper>
    );
};

const styles = StyleSheet.create({
    base: {
        flex: 1,
        backgroundColor: Colors.background,
    },
    safe: {
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    },
    centered: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    padded: {
        padding: 20,
    },
});
