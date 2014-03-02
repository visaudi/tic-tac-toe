Unbeatable Tic Tac Toe

To Run Load Index.html

File Architecture
The game loads through index.html. The file is the bare minimum to get the game started.

Javascripts Folder
This folder contains the game.
tic-tac-toe-board.js has always been the game's core. The business logic was originally completely contained here. It is now partially here.
tic-tac-toe-board.js also contains a rather bad YUI widget design that is the game board. It would be better if it were more modular (like allowing the board to be many sizes).

The other files in Javascripts that are not in either of the Tests folders contain business logic.

test.html is my original messy repository of tests. It was written without an idea of how to use test cases and so there is no strong sense of order.

modTest.html is my new approach at bringing order to my tests. Although it is far from finished, it demonstrates a new approach with modular tests that reflect the new order of my Javascript files.

Some tests may be run in modTest.html and the rest are in test.html.

Wish List
1. Clean Up Conditionals - Polymorphism
2. Allow for more absorbtion of variation (multiple board sizes)
3. Complete breaking apart the code into clairifying modules
4. Remove needless duplication
5. Introduce a responsive design
6. Modify the board widget to allow for many visual presentations of different board sizes.
