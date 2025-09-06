# WBM Config App

React + Electron desktop application for configuring and managing WBM hardware devices including MIDI GPIO controllers, MIDI lighting systems, and MIDI button controllers. This comprehensive configuration tool provides device programming, firmware management, and real-time communication with specialized interfaces for each device type.

## Key Features

- **MIDI GPIO Configuration**: Configure GPIO controllers with up to 6 channels, TRS/TS mode selection, input/output settings, and MIDI command mapping with .wbmgpio file support
- **MIDI Light Configuration**: Configure LED lighting controllers with 6-channel support, HSL color picker window, brightness control, white balance, and .wbmlight file support
- **MIDI Button Configuration**: Configure button controllers with 6-channel support, MIDI command assignment, velocity settings, and .wbmbtn file support
- **MTC Display**: Real-time MIDI Time Code display with frame rate support (29.97 drop frame) and live system clock functionality
- **USB Communication**: Real-time serial communication with WBM devices (VID 1003) at 256000 baud for configuration upload and device monitoring
- **Firmware Management**: Built-in BOSSA bootloader integration for firmware upload with cross-platform binaries (bossacmac/bossacwin.exe)
- **File Management**: Native file associations for .wbmlight, .wbmgpio, and .wbmbtn configuration files with custom icons and save/load functionality
- **Device Detection**: Automatic USB device detection for WBM devices with serial number validation (WBM: prefix) and bootloader mode support (WBMBXYZABC)
- **Matrix Routing**: Advanced 16x16 matrix routing interface for complex signal routing and device interconnection with grid-based UI
- **Color Picker Window**: Dedicated HSL color picker popup with hue slider, saturation/brightness controls, white balance checkbox, and real-time preview
- **Device Information Window**: Real-time device info display showing model, user name, serial number, and firmware version in dedicated popup
- **What's New System**: Comprehensive version history window with feature updates and "don't show again" functionality
- **Cross-Platform**: macOS and Windows builds with platform-specific BOSSA binaries, code signing, and file associations
- **Auto-Update**: Electron auto-updater with automatic update notifications and installation every 60 seconds
- **Developer Menu**: Hidden developer menu (Ctrl+Shift+D) with advanced firmware upload, device selection, and debugging capabilities
- **Command Configuration**: Comprehensive MIDI command pickers for Note On/Off, CC, Program Change, SysEx with velocity and value settings
- **Multi-Device Support**: Sidebar navigation for multiple connected devices with device-specific configuration interfaces

## Architecture

React + Electron desktop application with USB serial communication, BOSSA firmware upload integration, and modular device-specific configuration interfaces designed for professional WBM hardware programming and real-time device management.

## Device Support

- **MIDI GPIO**: 1, 2, 4, 8, 16 channel GPIO controllers with TRS/TS configuration and input/output mapping
- **MIDI Light**: LED lighting controllers with HSL color control, brightness management, and multi-channel support
- **MIDI Button**: Button controllers with MIDI command mapping, velocity settings, and channel configuration
- **MTC Display**: MIDI Time Code display devices with real-time clock functionality and frame rate support

## File Formats

- **.wbmgpio**: GPIO controller configuration files with channel settings and MIDI mappings
- **.wbmlight**: LED lighting controller configuration files with color and brightness settings
- **.wbmbtn**: Button controller configuration files with MIDI command assignments
- **.gpiofw**: Firmware files for device updates via BOSSA bootloader

## Windows and Interfaces

- **Main Window**: Primary configuration interface with device-specific tabs and navigation
- **Color Picker**: HSL color picker popup with real-time preview and white balance controls
- **Device Info**: Device information popup showing model, name, serial number, and firmware version
- **What's New**: Version history and feature update window with comprehensive changelog

## Dependencies

- React
- Electron
- Bootstrap
- SerialPort
- USB Detection
- FontAwesome
- react-pro-sidebar
- electron-updater