#!/bin/sh
function get_config() {
    local index="$1"

    if hash node 2>/dev/null; then
		printf "%s" "$(node -e '
			var val=JSON.parse(process.argv[1] || "{}")["'"$index"'"];
			console.log(typeof val === "undefined" ? "" : typeof val === "string" ? val : JSON.stringify(val));
		' "$(cat -)")"
	else
		printf "%s" "node is not installed! what are you doing?"
	fi
}