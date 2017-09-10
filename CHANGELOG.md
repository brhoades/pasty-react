# Changelog

## 1.0.1
* Old cookies were serialized by pgwcookie in a way that couldn't be read consistently. They're now cleared.

## 1.0.0
* pasty-core v0.1.4 consumption for common logic.
* Rewrite and uplift from Vue and PureCSS to:
  * react 15.6.1 (with router)
  * redux 3.7.2 (with saga / form)
  * semantic-ui
* Most logic is now typed.
* Removed zepto / Vue.

## 0.4.x
* TODO: Download all files in a tarball.
* TODO: uploaded files are automatically collapsed.
* TODO: Dynamically generate href on click to reduce page render time/size.

## 0.4.2
* Added error handling to pastes that fail. Shows the error for 3s then goes back to the paste.
* Now only using common hljs languages.
 * Language list stored in settings.
 * Can choose languages on the list.

## 0.4.1
* Copy shortened link to clipboard is back.
* Loading spinner now appears again for pasting.
* Pasting is now done from /.

## 0.4.0
* Removed separate view for uploading files.
* Files and code can be uploaded on the same paste.
* Code files can be uploaded from your machine.
* Added a drag and drop zone that appears when dragging a file over a paste.
* Files being pasted are now cards.
  * Cards can be expanded/collapsed.
* Change delete to trash can icon.
* Changed GH icon, added others.
* Can no longer add pastes with no files / only empty files.

## 0.3.4
* Code file input now shows the loading spinner while uploading.

## 0.3.3
* Encoding fixes for pasty-cli, pasty-core 0.1.2 use

## 0.3.2
* Fix for highlighting race condition where theme loads too slowly.

## 0.3.1
* Now supporting viewing "code" files with different mimes than text/plain.
* Fixed line highlighting for code files.

## 0.3.0
* Moved codefile to pasty-core.
* Now using pasty-core serializers.
* Now using paste api v2.

## 0.2.5
* Fix for unicode characters breaking the download button (and subsequently the entire page).

## 0.2.4
* Images no longer stretch to fill the page.

## 0.2.3
* IRC Highlighter
  * Minor color changes.
  * URLs are now highlighted / clickable.

## 0.2.2
* Theme selection box no longer clips theme names.
  * Purecss forms now included on all pages
* Theme selection only loaded the last selected theme, now it keeps up to date.
* IRC paste detection is now more aggressive.

## 0.2.1
* IRC highlighting now more robust.

## 0.2.0
* Downloading / decrypting now appears again.
* Empty pastes show something (instead of erroring).
* Plain / no highlighting option for pasting.
* User set highlighting types no longer change / detect.
* Wording changes in about page.
* Updated purecss to 1.0.
  * Settings two column collapses to one in smaller windows.
  * Settings menu no longer disappears on mobile.
  * Remove key size / step size constraints from settings.
* Content width is no longer relative, now max-width.
* IRC highlighting options.

## 0.1.2
* s3-upload uploaded files under dist, now it does not
* hljs themes now load from the correct path

## 0.1.1
* Added hashes to filenames for cache busting.

## 0.1.0
* Box to drop files / click to open the upload dialog is now larger.
* "Encrypting" message now shows up when uploading larger files.
* Paste's clipboard icon:
  * Copies to clipboard again (regression).
  * Does not jump around as the page loads.
* Removed "Pasty" prefix to file names for view file.
* App marigns are now equal on the left/right side.
* Displayed images are centered.
* Moved download link to the action box.
* Fixed copy to clipboard for view directly.

## 0.0.3
* Fixed transitions for upload file vs upload paste.
* Cleaned up directory structure.
* Separated pasty-core.

