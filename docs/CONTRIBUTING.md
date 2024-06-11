# Contributing to the Project

This document describes the conventions defined by the team for this project, including the agreed-upon formats and standards.

The conventions mentioned in this document are based on the following references:

**[Conventional Commits 1.0.0:](https://www.conventionalcommits.org/en/v1.0.0/)** A specification for adding human and machine readable meaning to commit messages

**[Google Java Style Guide:](https://google.github.io/styleguide/javaguide.html)** Code style guide provided by Google.

**[Google JavaScript Style Guide:](https://google.github.io/styleguide/jsguide.html)** Code style guide provided by Google.

## Table of Contents

- [Commit Standard](#commit-standard)
- [Branch Standard](#branch-standard)
- [PR Standard](#pull-request-standard)
- [Commit Standard](#commit-standard)
- [Code Style](#code-style)
    - [Java](#java-code-style)
    - [JavaScript](#javascript-code-style)

## Commit Standard

When making a commit, the following should be taken into account.

1. Each commit must begin with a "type" footer (see below).
2. **May** be followed by a *scope* indicating what is affected.
3. Must be followed by a brief description.
4. **May** include a body detailing the changes.
5. **May** have additional footers after the body.

```plaintext
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

#### Commit Format

* **Type**: Must be in all lowercase. Examples: `fix`, `feat`, `docs`, etc.
* **Scope**: Optional and must also be in all lowercase. Refers to the part of the code affected by the commit. Example: `(ui)`, `(server)`, `(docs)`.
* **Description**: Must be a brief description of the changes made. Should start with a lowercase letter and not end with a period.
* **Body**: Optional and used to explain the changes made in detail. Should start with a lowercase letter and not end with a period.
* **Footer**: Optional and used to reference the issues closed by the commit.

#### Footer Keywords

These are structural elements that communicate the intention of the commit:

- **fix**: indicates that a bug in the code was fixed.
- **feat**: indicates a new feature in the code.
- **docs**: indicates documentation of the code.
- **test**: indicates code testing.
- **style**: indicates changes that do not affect the meaning of the code (whitespace, formatting, missing semicolons, etc.).
- **refactor**: indicates a code change that neither fixes a bug nor adds a feature.
- **perf**: indicates a code change that improves performance.
- **chore**: indicates changes to build tasks or auxiliary tools and libraries.

Any other keywords are also allowed if they help provide better context.

##### Examples of commit messages:

```powershell
feat(user-auth): add password reset functionality

This commit adds the ability for users to reset their password. The user will receive an email with a link to reset their password.

Closes #123
```

```powershell
fix(server): fix server crash on startup

This commit fixes a bug where the server would crash on startup if the database was not reachable.

Closes #456
```

## Branch Standard

1. **main**: This is the main branch. It contains the production code, i.e., the code currently in use in production.
2. **develop**: This is the development branch, containing features that might be released in the next version.
3. **feature**: Each new feature should reside in its own branch, which can be pushed to the development repository for review.

```plaintext
feature/<feature-name>
```

4. **test**: If you are testing, you will use a test branch.

```plaintext
test/<feature-name-to-test>
```

5. **Bugfix**: If you are fixing a bug in production, you would use a bugfix branch.

```plaintext
bugfix/<bugfix-name>
```

6. **Hotfix**: Hotfixes are very similar to bugfixes, but represent urgent changes that need to be applied in production immediately and then merged into both `develop` and `main`.

```plaintext
hotfix/<hotfix-name>
```

7. **Release**: Once `develop` has acquired enough features for a release (or a specific release date is scheduled), a `release` branch is created.

```plaintext
release/<version-name>
```

## Pull Request Standard

When making a PR (Pull Request), the following should be taken into account.

1. The title of each PR should be brief and clearly describe what changes are being made.
2. The description of the PR should contain the following:
    - Description: A clear summary of the introduced changes.
    - Motivation and Context: Explanation of the reasons behind the changes and the problem they solve.
    - Changes Made: A list of specific changes made to the code.


##### Example of a PR:

```md
### Lines starting with one or more "#" should be considered as comments; these SHOULD NOT be included in the PR.

### Title (in its respective field)
Implement user authentication with JWT

### Description
This PR implements user authentication using JSON Web Tokens (JWT).

### Motivation and Context
The current authentication system presents scalability and security issues. With JWT, we aim to address these problems.

### Changes Made
- Added middleware for JWT generation and verification.
- Updated the user model to include refresh tokens.
- Modified the login logic to generate and return a JWT to the user.
```


## Code Style

### Java Code Style

The guide that provides conventions for the formatting of Java code, including indentation, comments, variable names, imports, etc. can be found at the beginning of this document **Google Java Style Guide**. Here are some key points:

* **Indentation** : Each time a new block or block-like construct is opened, the indent increases by two spaces. When the block ends, the indent returns to the previous indent level.
* **Variable declarations** : One variable per declaration and must be declared when necessary.
* **Naming** : Non-constant variable, Parameter variable and Local variable are written in `lowerCamelCase`.

    * **Package names** : Package names use only lowercase letters and digits (no underscores). Consecutive words are simply concatenated together. For `example, com.example.deepspace`, not `com.example.deepSpace` or `com.example.deep_space`.
    * **Class names** : Class names are written in `UpperCamelCase`, A test class has a name that ends with Test, for example, the test class for `HashIntegrationTest` should be `HashImplTest`.
    * **Method names** : Method names are written in `lowerCamelCase` and are typically verbs or verb phrases. For example, `sendMessage` or `stop`.
    * **Constant names** : Constant names use `UPPER_SNAKE_CASE`.

## JavaScript Code Style

Similarly to the Java style guide, conventions for formatting JavaScript code include rules regarding indentation, comments, variable names, imports, etc. Here are some key points:

* **Indentation**: Two-space indentation is used for each new block or block-like structure. Upon completing the block, the indentation returns to the previous level.

* **Variable Declarations**: One variable is declared per statement, and they are initialized as close as possible to where they are first used.

* **Names**:
    * **Package Names**: Package names follow the `lowerCamelCase` convention, with no underscores, and consecutive words simply concatenated.
    * **Class Names**: Classes are named in `UpperCamelCase`. For example, `MyClass`.
    * **Method Names**: Methods are named in `lowerCamelCase` and are typically verbs or verb phrases, such as `calculateTotal` or `retrieveData`.
    * **Constant Names**: Constants are named in `UPPER_SNAKE_CASE` and are declared with const.