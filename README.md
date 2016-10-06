# election-dashboard

An Electron kiosk app that displays election forecast graphs from [fivethirtyeight](http://projects.fivethirtyeight.com/2016-election-forecast/) one at a time.

Based on [resin-electronjs](https://github.com/resin-io/resin-electronjs) boilerplate.

## Usage

Clone this repo, `cd election-dashboard/app`, `npm install`, `npm start`. But I use this as a [resin.io](https://resin.io) app. See the boilerplate readme linked above for how to set that up.

## Configure via [environment variables](https://docs.resin.io/management/env-vars/)
Variable Name | Value | Description
------------ | ------------- | -------------
**`FIVETHIRTYEIGHT_PAGE_DURATION`** | # of milliseconds | how long each page is shown before moving to the next (default: 15 seconds)
**`FIVETHIRTYEIGHT_REFRESH_FREQUENCY`** | # of milliseconds | how often to refresh the page (to get updated data) (default: 30 minutes)
* **`URL_LAUNCHER_WIDTH`** | *int* (converted from *string*) | *defaults to* `1920`
* **`URL_LAUNCHER_HEIGHT`** | *int* (converted from *string*) | *defaults to* `1080`

Apply the above settings in the "Fleet Configuration" panel (if applying it for the all devices withing your application), or "Device Configuration" panel (if applying it for a single device).
