# URL Options

Client specific options can be set by adding query parameters to the server's url. One must prepend the url with a question mark (`?`) followed by `parameter=value` pairs separated with ampersands (`&`).


| Option | Value | Default | Description |
|----|----|----|----|
| hdpi | 1 / 0 | 0 |enable high resolution canvas |
| doubletab | number | 375 | sets the double tap/click time thershold in milliseconds |
| zoom | number | 1 | sets the initial zoom |

Example:

`http://server-ip:port?hdpi=1`


!!! note ""
    When using the built-in client, url options can be set through the `--url-options` switch.

    Example: `open-stage-control --url-options zoom=2 doubletap=200`
